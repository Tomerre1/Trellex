import React from 'react'
import VideoLabel from '@mui/icons-material/VideoLabel';

export function TaskHeader({ title }) {
    return (
        <header className="task-header">
            <div className="header-content">
                <div className="header-name flex">
                    <VideoLabel className="LabelSvg" />
                    <textarea value={title}></textarea>
                </div>
                <p className="list-name">in list <span>Backend</span></p>
            </div>
        </header>
    )
}


