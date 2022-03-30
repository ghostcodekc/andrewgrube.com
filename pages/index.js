import Link from '@/components/Link'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700 ">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        {/* <ul className="divide-y divide-gray-200 dark:divide-gray-700"> */}
        <div className="grid grid-cols-1 p-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, image, date, title, summary, tags } = frontMatter
            return (
              <div key={slug} className="p-5">
                <div className="max-w-sm overflow-hidden rounded shadow-lg">
                  <Image alt="Mountain" src={image} className="w-full" width={600} height={300} />
                  <div className="px-6 py-4">
                    <div className="mb-2 text-xl font-bold">
                      <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                        {title}
                      </Link>
                    </div>
                    <p className="text-base text-gray-700">{summary}</p>
                  </div>
                  <div className="ml-flex-wrap mb-3 ml-3">
                    TAGS:
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="ml-2 rounded-full bg-gray-800 text-xs font-semibold text-gray-700"
                      >
                        <Tag key={tag} text={tag} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              // <li key={slug} className="py-12">
              //   <article>
              //     <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              //       <dl>
              //         <dt className="sr-only">Published on</dt>
              //         <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              //           <time dateTime={date}>{formatDate(date)}</time>
              //         </dd>
              //       </dl>
              //       <div className="space-y-5 xl:col-span-3">
              //         <div className="space-y-6">
              //           <div>
              //             <h2 className="text-2xl font-bold leading-8 tracking-tight">
              //               <Link
              //                 href={`/blog/${slug}`}
              //                 className="text-gray-900 dark:text-gray-100"
              //               >
              //                 {title}
              //               </Link>
              //             </h2>
              //             <div className="flex flex-wrap">
              //               {tags.map((tag) => (
              //                 <Tag key={tag} text={tag} />
              //               ))}
              //             </div>
              //           </div>
              //           <div className="prose max-w-none text-gray-500 dark:text-gray-400">
              //             {summary}
              //           </div>
              //         </div>
              //         <div className="text-base font-medium leading-6">
              //           <Link
              //             href={`/blog/${slug}`}
              //             className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              //             aria-label={`Read "${title}"`}
              //           >
              //             Read more &rarr;
              //           </Link>
              //         </div>
              //       </div>
              //     </div>
              //   </article>
              // </li>
            )
          })}
          {/* </ul> */}
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">{/* <NewsletterForm /> */}</div>
      )}
    </>
  )
}
