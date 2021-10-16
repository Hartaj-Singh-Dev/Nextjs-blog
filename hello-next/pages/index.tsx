import React, { useState } from "react";
import Image from 'next/image'
import Head from 'next/head'
import styles from './index.module.scss'
import ReactPaginate from 'react-paginate';
import Articles from '../components/Articles';
import { GetStaticProps ,GetServerSideProps } from "next";
import { useRouter } from "next/router";


export default function Home({allposts}) {
  const [blog, setblog] = useState("")
  const router = useRouter()
//  const blogs = [{title:"Cors Error" , Date:" 06-10-2005",Content:"fibvuasfhuabsgiubsiugfus" ,id:"CorsId-9815153073"},{title:"How does Internet Work" , Date:"hreuogho" ,Content:"hguighs" ,id:"howdoesinternet work"}]

  const searchBlog =async (event)=>{
    setblog(event.target.value)
    const POSTS =  await allposts.filter((item)=>{
      if(item.title.toLowerCase().includes(blog.toLowerCase())){
        return item
      }else{
        console.log("No Post found")
      }
    }) 
    console.log(POSTS) 
    return POSTS  
  }
  return (
    <React.Fragment>
      <Head>
        <meta property="og:type" content="website" />
       <meta name="description" content="The Hartaj Writes blog by Hartaj Singh Short and simple articles on web development and Computer Programming." />
       <meta charSet="utf-8"/>
       <meta name="keywords" content="dev , development ,Programming , Database ,  CORS , Coding , stackoverflow , React , next js , node js , express , mongo db, sql ,SQl" />
       {/* {
         allposts.map((item)=>{
           return <meta name="Keywords"  key={item._id} content={`${item.blogKeyword1} , ${item.blogKeyword2} ,${item.blogKeyword3} ,${item.blogKeyword4}`}/>
         })
       } */}
       {/* <meta name="Keywords" content=""/> */}
       <meta name="author" content="Hartaj Singh Sidhu"/>
       <meta property="og:site_name" content="Hartaj Writes | blog | articles | programming" />
       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
       <meta property="og:title" content="Hartaj Writes | blog | articles | programming"/>
       <meta property="og:description" content="The Hartaj Writes blog by Hartaj Singh Short and simple articles on web development and Computer Programming"/>
        <meta name="twitter:site" content="@thehartajsingh" />
        <meta name="twitter:title" content="Hartaj Writes | blog | articles | programming " />
       <meta name="twitter:description" content="The Hartaj Writes blog by Hartaj Singh Short and simple articles on web development and Computer Programming"/> 
       <title>Hartaj Writes | blog | articles | programming</title>

      </Head>
      <section className={styles.blogHead}>
        <div className={styles.head}>
          <div className="myBlogPic">
           <img src="/PFP.png" className={styles.myPic} loading="eager"/>
          </div>
          <div className={styles.blogHeadData}>
            <div style={{overflow:"hidden"}}>
               <h1>
                      Hartaj Writes 
               </h1>
             </div>
             <h4>
             The Hartaj Writes blog by Hartaj Singh.
             Straight Forward and simple articles on web development and 
             Computer Programming.
             </h4>
          </div>

         <div className={styles.socialLinks}>
          <a href="https://www.instagram.com/thehartajsingh/" target="_blank" className={styles.socialLink}> Instagram</a>
          <a href="https://www.github.com/Hartaj-singh-dev" target="_blank" className={styles.socialLink}>GitHub</a>
          <a href="https://www.linkedin.com/in/hartaj-singh-sidhu-9068661ba/" target="_blank" className={styles.socialLink}>Linkedin</a>
          <a href="https://twitter.com/thehartajsingh" target="_blank" className={styles.socialLink}>Twitter</a>
          <a href="https://discordapp.com/users/772455850392027147" target="_blank" className={styles.socialLink}>Discord</a>
        </div>
        </div>
      </section>

      <section className={styles.blogPosts}>
        <div className={styles.searchInput}>
          <input type="search" placeholder="Search Blogs .."  name="blogType" value={blog} onChange={(event)=>{searchBlog(event)}}/>
        </div>
        <div className={styles.posts}>
          {
            allposts.map((itemData)=>{
              return <Articles title={itemData.title} key={itemData._id} date={itemData.date} content={itemData.content}/>
            })
          }
        </div>
      </section>
      <footer className={styles.blogFooter}>
        <h1>© 2021, Hartaj Singh . Designed with passion by @thehartajsingh. All rights reserved</h1>
      </footer>
    </React.Fragment>
  )
}


export  const getServerSideProps : GetServerSideProps =  async (context)=> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/allPosts`)
  const data = await res.json()
 const allPost = data.data.blogposts
 const allposts =  allPost.reverse()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {allposts},
  }
}