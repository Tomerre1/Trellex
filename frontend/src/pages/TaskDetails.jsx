import React, { Component } from "react";
import { connect } from "react-redux";

import { Close } from '@mui/icons-material';
import { TaskHeader } from '../cmps/TaskHeader';
import { TaskCardCover } from '../cmps/TaskCardCover'
import { TaskDescription } from '../cmps/TaskDescription'
import { TaskActivities } from '../cmps/TaskActivities'
import { TaskActionsMenu } from '../cmps/TaskActionsMenu'
import { PopoverLabels } from "../cmps/Popover/PopoverLabels";
import { PopoverMembers } from "../cmps/Popover/PopoverMembers";
import { PopoverChecklist } from '../cmps/Popover/PopoverChecklist'
import { PopoverDate } from "../cmps/Popover/PopoverDate";
import { PopoverAttachment } from '../cmps/Popover/PopoverAttachment';
import { PopoverCover } from '../cmps/Popover/PopoverCover';
import { LoaderSpinner } from '../cmps/LoaderSpinner'
import { saveBoard } from '../store/board.actions'
export class _TaskDetails extends Component {
  state = {
    isCover: true,
    currentTarget: null,
    isPopover: false,
    currTask: null,

  }
  contentEl = null;

  async componentDidMount() {
<<<<<<< HEAD
    const board = this.props // no redux yet
    const labels = board.labels
=======
    const { board } = this.props
>>>>>>> 2827d888acbb9ae3ae43762b4c857c56cf6e1c50
    const { taskId, listId } = this.props.match.params;
    const currGroup = board.groups.find(list => list.id === listId)
    const currTask = currGroup.tasks.find(task => task.id === taskId)
    this.setState({ isCover: false, currTask, currGroup, isPopover: false, currentTarget: null })
  }


  setCurrentTarget = (event, type) => {
    this.setState(prevState => ({ ...prevState, type, currentTarget: event.target.getBoundingClientRect() }))
    this.togglePopover()
  };
  togglePopover = () => {
    this.setState(prevState => ({ ...prevState, isPopover: !prevState.isPopover }))
  }

  updateBoard = (board) => {
    this.props.saveBoard(board)
  }


  render() {
    const { isCover, currentTarget, isPopover, type, currTask, currGroup } = this.state
    if (!currTask) return <LoaderSpinner />
    const { board } = this.props
    const DynamicCmpPopover = (props) => {
      switch (props.type) {
        case 'LABELS':
          return <PopoverLabels {...props} title='Labels' />
        case 'MEMBERS':
          return <PopoverMembers {...props} members={1, 2, 3} title='Members' />
        case 'CHECKLIST':
          return <PopoverChecklist {...props} currTask={currTask} title='Checklist' />
        case 'DATE':
          return <PopoverDate {...props} currTask={currTask} title='Date' />
        case 'ATTACHMENT':
          return <PopoverAttachment {...props} title='Attach from...' />
        case 'COVER':
          return <PopoverCover {...props} title='Cover' />
      }
    }

    return (
      <section className="task-details flex column">
        <button className={`close-task-details ${isCover ? 'cover' : ''}`}><Close /></button>
        <TaskCardCover />
        <TaskHeader />
        <div className="task-details-body flex">
          <div className="task-details-main flex column">
            <TaskDescription />
            <TaskActivities />
          </div>

          <TaskActionsMenu setCurrentTarget={this.setCurrentTarget} togglePopover={this.togglePopover} />
        </div>

        {isPopover && currentTarget && type && <DynamicCmpPopover togglePopover={this.togglePopover} currentTarget={currentTarget} type={type} updateBoard={this.updateBoard} board={board} group={currGroup} task={currTask} />}
      </section >

    );
  }
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}
const mapDispatchToProps = {
  saveBoard
};

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails);
