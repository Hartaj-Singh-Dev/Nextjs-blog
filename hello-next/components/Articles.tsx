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
                    <b>Date</b>: {props.date}
                </div>
                <div className={artStyle.someBlogData}>
                    <b>Content</b>
                :-{props.content}
                </div>
            </div>
            </article>
       </React.Fragment>
    )
}

export default Articles




