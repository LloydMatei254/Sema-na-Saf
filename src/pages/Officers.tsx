import React, { useState } from 'react'
import OfficersList from '../components/OfficersList'
import { useTeamsWithStats } from '../hooks/useTeams'
import LoadingSpinner from '../components/LoadingSpinner'

const Officers: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  // Use live data from Supabase
  const { teams, stats, loading, error } = useTeamsWithStats()

  const handleAddOfficer = () => {
    setShowAddModal(true)
  }

  const handleEditOfficer = (team: any) => {
    setSelectedTeam(team)
    setShowEditModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container-responsive py-4 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container-responsive py-4 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-20">
              <div className="text-red-500 mb-2">Error loading officers data</div>
              <div className="text-gray-500 text-sm">{error}</div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container-responsive py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <OfficersList 
            teams={teams}
            stats={stats}
            onAddOfficer={handleAddOfficer}
            onEditOfficer={handleEditOfficer}
          />
        </div>
      </main>

      {/* Add Officer Modal - Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="relative bg-white rounded-lg max-w-lg w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Team</h3>
              <p className="text-gray-600 mb-4">Team creation form will be implemented here.</p>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  Save Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Team Modal - Placeholder */}
      {showEditModal && selectedTeam && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="relative bg-white rounded-lg max-w-lg w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Edit Team: {selectedTeam.name}
              </h3>
              <p className="text-gray-600 mb-4">Team editing form will be implemented here.</p>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Officers