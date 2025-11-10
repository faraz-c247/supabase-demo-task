import type { Profile } from '../../types'
import './Profile.css'

interface ProfileViewProps {
  profile: Profile | null
  loading: boolean
  userEmail: string
  onEdit: () => void
}

export default function ProfileView({ profile, loading, userEmail, onEdit }: ProfileViewProps) {
  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile?.full_name?.[0]?.toUpperCase() || userEmail[0].toUpperCase()}
          </div>
          <h2 className="profile-title">Profile</h2>
        </div>

        <div className="profile-content">
          <div className="profile-field">
            <label>Email</label>
            <div className="profile-value">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M3.333 5.833L10 10.833l6.667-5M3.333 14.167h13.334a1.667 1.667 0 001.666-1.667V7.5a1.667 1.667 0 00-1.666-1.667H3.333A1.667 1.667 0 001.667 7.5v5a1.667 1.667 0 001.666 1.667z" 
                  stroke="#667eea" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              {userEmail}
            </div>
          </div>

          <div className="profile-field">
            <label>Full Name</label>
            <div className="profile-value">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M10 10a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667zM3.333 16.667a6.667 6.667 0 0113.334 0" 
                  stroke="#667eea" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              {profile?.full_name || 'Not set'}
            </div>
          </div>

          <div className="profile-field">
            <label>Address</label>
            <div className="profile-value">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M10 10.833a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" 
                  stroke="#667eea" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M10 1.667c-3.682 0-6.667 2.985-6.667 6.666 0 5 6.667 10 6.667 10s6.667-5 6.667-10c0-3.681-2.985-6.666-6.667-6.666z" 
                  stroke="#667eea" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              {profile?.address || 'Not set'}
            </div>
          </div>

          <div className="profile-field">
            <label>Member Since</label>
            <div className="profile-value">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M15.833 3.333H4.167A1.667 1.667 0 002.5 5v11.667a1.667 1.667 0 001.667 1.666h11.666a1.667 1.667 0 001.667-1.666V5a1.667 1.667 0 00-1.667-1.667zM13.333 1.667V5M6.667 1.667V5M2.5 8.333h15" 
                  stroke="#667eea" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={onEdit}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path 
              d="M9.167 3.333H3.333A1.667 1.667 0 001.667 5v11.667A1.667 1.667 0 003.333 18.333h11.667A1.667 1.667 0 0016.667 16.667V10.833" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M15.417 2.083a1.768 1.768 0 112.5 2.5L10 12.5l-3.333.833L7.5 10l7.917-7.917z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Edit Profile
        </button>
      </div>
    </div>
  )
}
