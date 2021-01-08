import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <br/>
            <div className={utilStyles.lightText}>{postData.id}</div>
            <br/>
            <Date dateString={postData.date}/>
            <br/>
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }

  export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }