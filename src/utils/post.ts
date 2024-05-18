import { getCollection } from 'astro:content'

export const getCategories = async () => {
	const posts = await getCollection('blog')
	const categories = new Set(posts.map((post) => post.data.category))
	return Array.from(categories)
}

export const getPosts = async (max?: number) => {
	const allPosts = await getCollection('blog') || [];
	const filteredPosts = allPosts
	  .filter(post => !post.data.draft)
	  .sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
  
	if (filteredPosts.length === 0) {
	  return null; // Or return undefined, based on your preference
	}
  
	return filteredPosts.slice(0, max);
  }
  
  

export const getTags = async () => {
	const posts = await getCollection('blog')
	const tags = new Set(posts.map((post) => post.data.tags).flat())
	return Array.from(tags)
}

export const getPostByTag = async (tag: string) => {
	const posts = await getPosts()
	return posts.filter((post) => post.data.tags.includes(tag))
}

export const filterPostsByCategory = async (category: string) => {
	const posts = await getPosts()
	return posts.filter((post) => post.data.category.toLowerCase() === category)
}
