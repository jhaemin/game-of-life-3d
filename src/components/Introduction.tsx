import clsx from 'clsx'
import { useCallback, useState } from 'react'
import styles from './Introduction.module.css'

export default function Introduction() {
  const [isHidden, setIsHidden] = useState(false)

  const gotIt = useCallback(() => {
    setIsHidden(true)
  }, [])

  if (isHidden) return null

  return (
    <div className={clsx('layer', styles.introduction)}>
      <h1 className={styles.title}>Game of Life 3D</h1>
      <p className={styles.paragraph}>
        An experimental playground project for multiple frontend technologies.
      </p>
      <p className={styles.paragraph}>
        You can zoom, rotate and pan with mouse or touch actions.
      </p>
      <button
        className={clsx(styles.paragraph, styles.gotItBtn)}
        onClick={gotIt}
      >
        Got it
      </button>
    </div>
  )
}
