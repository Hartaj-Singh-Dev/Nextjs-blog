import React from 'react'
import Articles from './Articles'

const SearchedArticles = (props) => {
	console.log("Article searched")
	console.log(props.listofposts)
	return (
		<>
		{props.listsofposts.map((itemData)=>{
              return <Articles title={itemData.title} key={itemData._id} date={itemData.date} content={itemData.content}/>
            })}		
		</>
	)
}

export default SearchedArticles
