import styles from './styles.module.css'

const MySpinner = () => {
    return (
        <div className={styles.loadingSpinnerContainer}>
            <div className={styles.loadingSpinner}></div>
        </div>
    )
}

export default MySpinner