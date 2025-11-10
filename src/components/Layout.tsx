import React, { useState } from 'react'
import './Layout.css'

interface LayoutProps {
  userName: string
  onSignOut: () => void
  children: React.ReactNode
}

export type TabType = 'todos' | 'profile'

interface TabConfig {
  id: TabType
  label: string
  icon: React.ReactElement
}

const tabs: TabConfig[] = [
  {
    id: 'todos',
    label: 'Tasks',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path 
          d="M7.5 10l2.5 2.5 5-5M3.333 10.833V4.167A1.667 1.667 0 015 2.5h10a1.667 1.667 0 011.667 1.667v6.666A1.667 1.667 0 0115 12.5H5a1.667 1.667 0 01-1.667-1.667zM3.333 10.833L1.667 12.5v5h16.666v-5L16.667 10.833" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path 
          d="M10 10a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667zM3.333 16.667a6.667 6.667 0 0113.334 0" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export default function Layout({ userName, onSignOut, children }: LayoutProps) {
  const [activeTab, setActiveTab] = useState<TabType>('todos')

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
                <path 
                  d="M9 16l4 4 10-10" 
                  stroke="white" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#667eea"/>
                    <stop offset="100%" stopColor="#764ba2"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="logo-text">TaskFlow</span>
            </div>
          </div>

          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">{userName[0].toUpperCase()}</div>
              <span className="user-name">{userName}</span>
            </div>
            <button onClick={onSignOut} className="btn-signout">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M7.5 17.5h-2.5a1.667 1.667 0 01-1.667-1.667V4.167A1.667 1.667 0 015 2.5h2.5M13.333 14.167L17.5 10l-4.167-4.167M17.5 10h-10" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <nav className="nav-tabs">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="main-content">
        <div className="content-wrapper">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              const tabId = (child.props as any)['data-tab-id']
              if (tabId === activeTab) {
                return child
              }
            }
            return null
          })}
        </div>
      </main>
    </div>
  )
}
