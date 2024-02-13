

const SalesListScreen = () => {

  const error = {}
  return (
    <div>{error.map(e=>(<div key={e}>{e}</div>))}</div>
  )
}

export default SalesListScreen