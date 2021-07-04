import { state } from '@/state'
import { tickUniverse } from '@/wasm'
import clsx from 'clsx'
import { ChangeEvent, useCallback, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import styles from './Controls.module.css'

export default function Controls() {
  const { tickSpeed, isStopped } = useSnapshot(state)

  const onChangeTickSpeed = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)

    state.tickSpeed = value
  }, [])

  return (
    <div className={clsx('layer', styles.controls)}>
      <label>Speed</label>
      <input
        type="range"
        value={tickSpeed}
        min={0.1}
        max={2}
        step={0.1}
        onChange={onChangeTickSpeed}
      />
      <div className={styles.stopAndNext}>
        <button onClick={() => (state.isStopped = !state.isStopped)}>
          {isStopped ? 'Play' : 'Stop'}
        </button>
        {isStopped && (
          <button
            className={styles.next}
            onClick={() => {
              state.tickTriggered = !state.tickTriggered
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
