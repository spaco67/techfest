import React, { useState } from 'react'
import Papa from 'papaparse'

function App() {
  const [contacts, setContacts] = useState([])

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          // Filter out empty rows and get phone numbers
          const validContacts = results.data
            .filter(row => Object.values(row).some(value => value !== ""))
            .map(row => {
              // Find the phone number column (could be "phone", "Phone", "number", etc.)
              const phoneKey = Object.keys(row).find(key => 
                key.toLowerCase().includes('phone') || 
                key.toLowerCase().includes('number')
              )
              return { phone: row[phoneKey] || Object.values(row)[0] }
            })
            .filter(contact => contact.phone && contact.phone.trim() !== '')
          
          setContacts(validContacts)
        },
        header: true,
        skipEmptyLines: true
      })
    }
  }

  const copyAllNumbers = () => {
    const numbers = contacts.map(contact => contact.phone).join('\n')
    navigator.clipboard.writeText(numbers)
      .then(() => alert('All numbers copied to clipboard!'))
      .catch(err => console.error('Failed to copy numbers:', err))
  }

  const copyNumber = (number) => {
    navigator.clipboard.writeText(number)
      .then(() => alert('Number copied!'))
      .catch(err => console.error('Failed to copy number:', err))
  }

  const sendSMS = (numbers) => {
    window.open(`sms:${numbers}`)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Bulk SMS Manager</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="file" 
          accept=".csv"
          onChange={handleFileUpload}
          style={{ marginBottom: '10px' }}
        />
      </div>

      {contacts.length > 0 && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <button 
              onClick={copyAllNumbers}
              style={{
                padding: '8px 16px',
                marginRight: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Copy All Numbers
            </button>
            <button 
              onClick={() => sendSMS(contacts.map(c => c.phone).join(','))}
              style={{
                padding: '8px 16px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Send Bulk SMS
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Phone Number</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{contact.phone}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <button 
                      onClick={() => copyNumber(contact.phone)}
                      style={{
                        padding: '4px 8px',
                        marginRight: '5px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Copy
                    </button>
                    <button 
                      onClick={() => sendSMS(contact.phone)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      SMS
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
