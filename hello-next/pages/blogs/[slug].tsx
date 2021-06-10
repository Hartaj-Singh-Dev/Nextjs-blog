import React from 'react';
import Head from "next/head"
import blogStyle from './blog.module.scss'
import Image from 'next/image';
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next';

const Nothing =async ()=>{
  const resPosts = await fetch('http://localhost:8000/allPosts')
  const posts = await resPosts.json()
  const datapost = posts.data.blogposts
  return datapost
}

export async function getStaticPaths(context){
  const datapost = await Nothing()    
  return { paths:datapost.map((fileName)=>{
    return {
      params:{
        slug: fileName.title,
      },
    };
  })  , fallback: false }
}



const BlogPost = ({Post}) => {
    return (
        <React.Fragment>
            <Head>
              <meta name="Keywords" content={`${Post.blogKeyword4} , ${Post.blogKeyword3} , ${Post.blogKeyword2} ,${Post.blogKeyword1}`}/>
               <title>{Post.title}</title>
            </Head>
            <header>
              <div className={blogStyle.nav}>
                <nav>
                  <Link href="/"><h2 className={blogStyle.homeLink}>Hartaj Singh</h2></Link>
                </nav>
              </div>
            </header>
            <main className={blogStyle.BlogPosts}>
                <section className={blogStyle.blogPostData}>
                    <div className={blogStyle.articleTitle}>
                        <h1>{Post.title}</h1>
                    </div>

                    <div className={blogStyle.articleDate}>
                      <h3>Date:-{" "}{Post.date}</h3>
                    </div>

                    <div className={blogStyle.headerPicture}>
                        <img src={Post.imageLinks1} height={450} alt="Post Header" width={750}  loading="lazy"/>
                    </div>
                        <p></p>
                    <div className="contentStartsWORDS50">
                          {/* <Image src={props.imageLinks2}/> */}
                    </div>
                    <div className="contentStartsWORD100">
                          {/* <Image src={props.imageLinks3}/> */}
                    </div>
                    <div className="contentStartsWORDS150">
                          {/* <Image src={props.imageLinks4}/> */}
                    </div>
                    <div className="contentStartsWORDS200">
                          {/* <Image src={props.imageLinks5}/> */}
                    </div>
                </section>
            </main>
            <footer>

            </footer>
        </React.Fragment>
    )
}

export const getStaticProps: GetStaticProps= async (context)=>{
  const res = await fetch(`http://localhost:8000/allPosts`)
  const data = await res.json()
 const Posts = data.data.blogposts
 const posts = Posts.filter((item)=>{
   if(item.title === context.params.slug){
     return item
   }
 })
 const Post = posts[0]
 console.log(Post)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {Post},
  }
}

export default BlogPost
