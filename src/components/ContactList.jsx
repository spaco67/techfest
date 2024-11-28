function ContactList({ contacts }) {
  const copyAllNumbers = () => {
    const numbers = contacts.map(contact => contact.phone).join('\n')
    navigator.clipboard.writeText(numbers)
      .then(() => alert('All numbers copied to clipboard!'))
      .catch(err => console.error('Failed to copy numbers:', err))
  }

  const sendSMS = () => {
    const numbers = contacts.map(contact => contact.phone).join(',')
    window.open(`sms:${numbers}`)
  }

  if (contacts.length === 0) {
    return <p>No contacts imported yet. Please upload a CSV file.</p>
  }

  return (
    <div>
      <div className="actions">
        <button onClick={copyAllNumbers}>Copy All Numbers</button>
        <button onClick={sendSMS}>Send SMS</button>
      </div>
      <table className="contacts-table">
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => {
                  navigator.clipboard.writeText(contact.phone)
                    .then(() => alert('Number copied!'))
                }}>
                  Copy
                </button>
                <button onClick={() => {
                  window.open(`sms:${contact.phone}`)
                }}>
                  SMS
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContactList
