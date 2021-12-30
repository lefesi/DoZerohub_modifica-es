import { GithubUser } from './GithubUser';
export interface Member {
  github_user: string
  linkedin_url: string
  bio: string
  github?: GithubUser
}