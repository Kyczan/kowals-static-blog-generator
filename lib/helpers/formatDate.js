const formatDate = dateString => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const date  = new Date(dateString).toLocaleDateString('en-US', options)
  return date
}

module.exports = formatDate
