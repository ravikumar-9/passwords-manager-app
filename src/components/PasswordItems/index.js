import './index.css'

const PasswordItems = props => {
  const {passwordItemDetails, deletePasswordItem, isCheckActive} = props

  const {id, userName, websiteName, password, bgColor} = passwordItemDetails

  const initialName = userName.slice(0, 1)

  console.log(isCheckActive)

  const deletePassword = () => {
    deletePasswordItem(id)
  }

  const passwordOrStars = () => {
    if (isCheckActive === true) {
      return <p className="password">{password}</p>
    }
    return (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
        className="stars"
      />
    )
  }

  return (
    <li className="password-item">
      <div className="profile-container">
        <p className={bgColor}>{initialName}</p>
        <div className="name-p-container">
          <h1 className="website-name">{websiteName}</h1>
          <p className="username">{userName}</p>
          {passwordOrStars()}
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        data-testid="delete"
        onClick={deletePassword}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItems
