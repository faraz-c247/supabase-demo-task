import { useState, useEffect, useRef } from 'react'
import type { Profile } from '../../types'
import './Profile.css'

interface ProfileEditProps {
  profile: Profile | null
  onSave: (updates: Partial<Profile>) => Promise<any>
  onUploadAvatar: (file: File) => Promise<any>
  onDeleteAvatar: (avatarUrl: string) => Promise<any>
  onCancel: () => void
}

export default function ProfileEdit({ profile, onSave, onUploadAvatar, onDeleteAvatar, onCancel }: ProfileEditProps) {
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [address, setAddress] = useState(profile?.address || '')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar_url || null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '')
      setAddress(profile.address || '')
      setAvatarPreview(profile.avatar_url || null)
    }
  }, [profile])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB')
      return
    }

    setSelectedFile(file)
    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    setError('')
  }

  const handleUploadAvatar = async () => {
    if (!selectedFile) return

    setUploadingAvatar(true)
    setError('')

    try {
      const { error: uploadError, publicUrl } = await onUploadAvatar(selectedFile)

      if (uploadError) {
        setError(uploadError.message)
        setAvatarPreview(profile?.avatar_url || null)
      } else {
        setAvatarPreview(publicUrl || null)
        setSelectedFile(null)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (err: any) {
      setError(err.message)
      setAvatarPreview(profile?.avatar_url || null)
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleRemoveAvatar = async () => {
    if (!profile?.avatar_url) return

    setUploadingAvatar(true)
    setError('')

    try {
      const { error: deleteError } = await onDeleteAvatar(profile.avatar_url)

      if (deleteError) {
        setError(deleteError.message)
      } else {
        setAvatarPreview(null)
        setSelectedFile(null)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      const { error: updateError } = await onSave({
        full_name: fullName,
        address: address,
      })

      if (updateError) {
        setError(updateError.message)
      } else {
        setSuccess(true)
        setTimeout(() => {
          onCancel()
        }, 1000)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="profile-title">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          {error && (
            <div className="error-message">{error}</div>
          )}
          
          {success && (
            <div className="success-message">
              Profile updated successfully!
            </div>
          )}

          {/* Avatar Upload Section */}
          <div className="form-group">
            <label>Profile Picture</label>
            <div className="avatar-upload-container">
              <div className="avatar-preview">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" className="avatar-image" />
                ) : (
                  <div className="avatar-placeholder">
                    {fullName?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
              </div>
              <div className="avatar-actions">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-secondary btn-sm"
                  disabled={uploadingAvatar || loading}
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ marginRight: '0.5rem' }}>
                    <path d="M13.333 13.333l-3.333-3.333-3.333 3.333M10 10v7.5M16.667 13.95c.917-.667 1.666-1.8 1.666-3.117 0-2.3-1.866-4.166-4.166-4.166-.234 0-.467.016-.684.05a5.833 5.833 0 10-10.95 2.566" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Choose Image
                </button>
                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleUploadAvatar}
                    className="btn btn-primary btn-sm"
                    disabled={uploadingAvatar || loading}
                  >
                    {uploadingAvatar ? 'Uploading...' : 'Upload'}
                  </button>
                )}
                {avatarPreview && !selectedFile && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="btn btn-danger btn-sm"
                    disabled={uploadingAvatar || loading}
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className="avatar-hint">
                Max size: 5MB. Supported formats: JPG, PNG, GIF
              </p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, City, State, ZIP"
              className="form-input form-textarea"
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
