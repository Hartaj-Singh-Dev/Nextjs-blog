import React from 'react'
import Articles from './Articles'

const NonSeachArticles = (props) => {
	return (
		<>
		{props.listofposts.map((itemData)=>{
              return <Articles title={itemData.title} key={itemData._id} date={itemData.date} content={itemData.content}/>
            })}	
		</>
	)
}

export default NonSeachArticles;
