/* ----------------------------------------------------------------------------
com\type\micro-cms-blog.ts
// ----------------------------------------------------------------------------
// [ com > type > micro-cms-blog ]
import {} from '@/com/type/micro-cms-blog';
----------------------------------------------------------------------------- */
export type MicroCmsBlogDetail = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
  category: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string;
  };
};

export type MicroCmsBlogs = {
  contents: MicroCmsBlogDetail[];
  totalCount: number;
  offset: number;
  limit: number;
};
