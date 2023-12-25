import type { WP_REST_API_Post, WP_REST_API_Category } from "wp-types";
import {type CommonPost} from '@/store'
import { baseRequestHeaders } from './store/index';

export function fixWPDate(date:string){
    let a = date.split(/-|\s|:/);
    a = [a[0],a[1], ...a[2].split('T'), a[3], a[4]]
    a = [ a[3],":", a[4], ' de ', a[2],"/", a[1],"/", a[0]]
    return a.join('');
  }
  
  
  export function parseApiPost(post:WP_REST_API_Post) {
    let featured = ''
    if(post._embedded){
      if(post._embedded['wp:featuredmedia'])
        if(post._embedded['wp:featuredmedia'][0]){
          // @ts-ignore
          featured = post._embedded['wp:featuredmedia'][0].source_url
        }
    }
    let d = post.content?.rendered.split("hidden").join('').replaceAll('simmp.com.br/wp-content/', 'simmp.com.br/wordpress/wp-content/');
    return {
      content: d,
      data: fixWPDate(post.date),
      excerpt: post.excerpt.rendered,
      id: post.id,
      featured,
      tags:post.categories,
      title: post.title.rendered
    }
  }

  export async function retrieveParseSingleApiObj(url:string){
    return ((await (await fetch(`${url}`,  baseRequestHeaders)).json()) as WP_REST_API_Category) ;
  }
  export async function superWPJsonFetch(url:string){
    return (await (await fetch(`${url}`, baseRequestHeaders)).json() as WP_REST_API_Post[]).map(parseApiPost) as CommonPost[]
  }