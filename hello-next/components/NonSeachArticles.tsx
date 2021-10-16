import React from 'react'
import Articles from './Articles'

const nonSeachArticles = (props) => {
	return (
		<>
		{props.LISTOFPOSTS.map((itemData)=>{
              return <Articles title={itemData.title} key={itemData._id} date={itemData.date} content={itemData.content}/>
            })}	
		</>
	)
}

export default nonSeachArticles;
