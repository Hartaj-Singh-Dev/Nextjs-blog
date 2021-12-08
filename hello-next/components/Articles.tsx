import React from 'react'
import artStyle from './Articles.module.scss'
import Link from 'next/link'

const Articles = (props) => {
    return (
        <React.Fragment>
            <article>
            <div className={artStyle.article}>
                <div className={artStyle.articleHead}>
                    <Link href={`/blogs/${props.title}`}>
                    <h1> {props.title} </h1>
                    </Link>
                </div>
                <div className={artStyle.articleDate}>
                    <b>Date</b>: {props.date.slice(0,10)}
                </div>
                <div className={artStyle.someBlogData}>
                    <b>Content</b>
                :-{props.content.slice(0,300)}
                </div>
            </div>
            </article>
       </React.Fragment>
    )
}

export default Articles




