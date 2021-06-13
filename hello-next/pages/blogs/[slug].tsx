import React from "react";
import Head from "next/head";
import blogStyle from "./blog.module.scss";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";

const Nothing = async () => {
  const resPosts = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/allPosts`);
  const posts = await resPosts.json();
  const datapost = posts.data.blogposts;
  return datapost;
};

export async function getStaticPaths(context) {
  const datapost = await Nothing();
  return {
    paths: datapost.map((fileName) => {
      return {
        params: {
          slug: fileName.title,
        },
      };
    }),
    fallback: false,
  };
}

const BlogPost = ({ Post }) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="description" content={Post.content.slice(0, 155)} />
        <meta
          name="Keywords"
          content={`${Post.blogKeyword4} , ${Post.blogKeyword3} , ${Post.blogKeyword2} , "development " , "programming" ,"Coding",${Post.blogKeyword1}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={Post.title} />
        <meta property="og:description" content={Post.content.slice(0.155)} />
        <title>{Post.title}</title>
      </Head>
      <header>
        <div className={blogStyle.nav}>
          <nav>
            <Link href="/">
              <h2 className={blogStyle.homeLink}>Hartaj Singh</h2>
            </Link>
          </nav>
        </div>
      </header>
      <main className={blogStyle.BlogPosts}>
        <section className={blogStyle.blogPostData}>
          <div className={blogStyle.articleTitle}>
            <h1>{Post.title}</h1>
          </div>

          <div className={blogStyle.articleDate}>
            <h3>
              Date:- {Post.date.slice(0, 10)} &nbsp;{" "}
              <span className={blogStyle.ReadTime}>
                {"  "}
                {Post.date.slice(11)}
              </span>
            </h3>
          </div>

          <div className={blogStyle.headerPicture}>
            <img
              src={Post.imageLinks1}
              height={450}
              alt="Post Header"
              width={750}
              loading="lazy"
            />
          </div>
          <div className="contentWithImages">
            <p className={blogStyle.Content}>{Post.content.slice(0,1000)}</p>
            <div className="contentStartsWORDS1001">
               <img  src={Post.imageLinks2}  height={450}  alt="Post Picture"  width={750} loading="lazy"/>
               <p className={blogStyle.Content}>{Post.content.slice(1001 , 2000)}</p>
            </div>
           
            <div className="contentStartsWORD2000">
               <img  src={Post.imageLinks3}  height={450}  alt="Post Picture"  width={750} loading="lazy"/>
               <p className={blogStyle.Content}>{Post.content.slice(2001 , 4000)}</p>
            </div>
            <div className="contentStartsWORDS2800">
              <p className={blogStyle.Content}>{Post.content.slice(4001,5000)}</p> 
              <div className="thankuGIF">
                <img  src={Post.imageLinks4}  height={250}  alt="Post Picture"  width={850} loading="lazy"/>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className={blogStyle.footBlock}>
        <section className={blogStyle.authorBlock}>
          <div className="Image">
            <Image
              src="/Hartaj Singh Sidhu.jpg"
              height={50}
              width={50}
              loading="lazy"
              className={blogStyle.authorImage}
            />
          </div>
          <div className={blogStyle.authorData}>
            The Hartaj Writes blog by Hartaj Singh. Straight Forward and simple
            articles on web development and Computer Programming.
          </div>
        </section>
        <div className={blogStyle.goBackButton}>
          <Link href="/">
            <h1>Go Back</h1>
          </Link>
        </div>
      </footer>
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/allPosts`);
  const data = await res.json();
  const Posts = data.data.blogposts;
  const posts = Posts.filter((item) => {
    if (item.title === context.params.slug) {
      return item;
    }
  });
  const Post = posts[0];

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { Post },
    revalidate: 800,
  };
};

export default BlogPost;
