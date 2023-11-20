import React from 'react'
import BreadCrumbs from '../../components/BreadCrumbs'
import { images } from '../../constants'
import { Link } from 'react-router-dom'
import SuggestedPosts from './container/SuggestedPosts'

const breadCrumbsData = [
  { name: "Home" , link: "/" },
  { name: "Blog" , link: "/blog" },
  { name: "Article title" , link: "/blog/1" },
]
const posts = [
  {_id: 1, image: images.DisplayImage, title: "Help children get better education", createdAt: "2023-01-09T08:24:14-05:00"},
  {_id: 2, image: images.DisplayImage, title: "Choosing The Best Photo Printer", createdAt: "2023-01-19T08:24:14-05:00"},
  {_id: 3, image: images.DisplayImage, title: "Help Finding Information Online", createdAt: "2023-04-14T08:24:14-05:00"},
  {_id: 4, image: images.DisplayImage, title: "Help Finding Information Online", createdAt: "2023-04-14T08:24:14-05:00"},
]
const tags = ["Learn", "JavaScript", "ChatGPT", "Entertainment", "UI/UX" ]

const ArticlePage = () => {
  return (
    
    <section className='container mx-auto max-w-7xl flex flex-col px-5 py-5 lg:py-2 lg:flex-row lg:gap-5 '>
        <article className='flex-1 lg:w-2/3'>
          <BreadCrumbs data={breadCrumbsData} />
          <img src={images.CardImage} className='w-full mt-1 rounded object-cover object-center h-auto md:aspect-video lg:h-[25rem] xl:h-[26rem]' alt="Laptop" />
          <Link to={"blog?category=selectedCategory"} className='text-primary tracking-widest inline-block mt-3 lg:text-xl'>EDUCATION</Link>
          <h2 className='text-dark-hard font-semibold font-roboto tracking-wide text-2xl my-3 lg:text-3xl xl:text-4xl'>Help children get better education</h2>
          <div className='text-dark-soft opacity-90 leading-relaxed lg:mb-3 lg:text-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione eligendi, cupiditate placeat vel quas perferendis. Eaque aliquam, excepturi nulla rem sit pariatur sunt laborum asperiores atque distinctio sapiente molestiae eligendi doloribus minima odio nostrum quo voluptatibus deleniti incidunt ea blanditiis suscipit. Rem voluptate libero laboriosam atque sit debitis nobis odio, soluta at mollitia officiis minus iusto exercitationem. Odio, totam dolores perspiciatis, maiores quibusdam omnis eius accusantium eum quas odit aspernatur dolorem dignissimos provident debitis harum iure! Ullam laboriosam pariatur quia ducimus inventore nulla culpa, facilis nam. Iure veritatis eum dicta at tempore assumenda reprehenderit illum incidunt pariatur! Dicta, aliquid assumenda!</div>
        </article>
        <SuggestedPosts classname={""} header={"Latest Articles"} posts={posts} tags={tags} />
    </section>
  )
}

export default ArticlePage