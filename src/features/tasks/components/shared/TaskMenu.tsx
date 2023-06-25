import React, { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { CSSProperties, Task } from '../../../../types'
import TaskModal from '../shared/TaskModal'
import { useTasksAction } from '../../hooks/Tasks'
import { TASK_PROGRESS_ID, TASK_MODAL_TYPE } from '../../../../constants/app'

interface TaskMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  task?: Task
}

const TaskMenu = ({ setIsMenuOpen, task }: TaskMenuProps): JSX.Element => {
  // Ditambahkan
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { deleteTask } = useTasksAction()

  return (
    <div style={styles.menu}>
      <div
        style={styles.menuItem}
        onClick={(): void => {
          setIsModalOpen(true)
        }}
      >
        <span className="material-symbols-outlined">edit</span>
        Edit
      </div>
      <div
        style={styles.menuItem}
        onClick={(): void => {
          if (task !== undefined) {
            deleteTask(task.id)
          }
        }}
      >
        <span className="material-symbols-outlined">delete</span>Delete
      </div>
      <span
        className="material-symbols-outlined"
        style={styles.closeIcon}
        onClick={(): void => {
          setIsMenuOpen(false)
        }}
      >
        close
      </span>
      {isModalOpen && (
        <TaskModal
          headingTitle="Edit Task"
          setIsModalOpen={setIsModalOpen}
          type={TASK_MODAL_TYPE.EDIT}
          defaultProgressOrder={
            task !== undefined ? task.progressOrder : TASK_PROGRESS_ID.NOT_STARTED
          }
          task={task}
        />
      )}
    </div>
  )
}

const styles: CSSProperties = {
  menu: {
    backgroundColor: '#fff',
    border: '1px solid gray',
    padding: '8px 16px',
    position: 'absolute',
    top: '-10px',
    right: '4%',
    zIndex: 10,
  },
  menuItem: {
    display: 'flex',
    marginBottom: '8px',
    cursor: 'pointer',
  },
  closeIcon: {
    position: 'absolute',
    top: '0px',
    right: '2px',
    cursor: 'pointer',
  },
}

export default TaskMenu
