import React, { useState } from 'react'
import OfficersList from '../components/OfficersList'
import { Officer } from '../data/officersData'

const Officers: React.FC = () => {
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleAddOfficer = () => {
    setShowAddModal(true)
  }

  const handleEditOfficer = (officer: Officer) => {
    setSelectedOfficer(officer)
    setShowEditModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container-responsive py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <OfficersList 
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Officer</h3>
              <p className="text-gray-600 mb-4">Officer creation form will be implemented here.</p>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  Save Officer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Officer Modal - Placeholder */}
      {showEditModal && selectedOfficer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="relative bg-white rounded-lg max-w-lg w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Edit Officer: {selectedOfficer.name}
              </h3>
              <p className="text-gray-600 mb-4">Officer editing form will be implemented here.</p>
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