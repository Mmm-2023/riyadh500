import { Seo } from '../components/Seo'
import { pageMetaForPath } from '../content/seo'

export function PrivacyPage() {
  return (
    <>
      <Seo meta={pageMetaForPath('/privacy')} />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-serif text-5xl">Privacy</h1>
        <p className="mt-4 text-[16px]">
          Votes are tied to your sign-in and are not shown with your name. Nominations are not public. Newsletter emails are stored so we can write to you. Example profiles on this site are not real people.
        </p>
      </div>
    </>
  )
}

export function TermsPage() {
  return (
    <>
      <Seo meta={pageMetaForPath('/terms')} />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-serif text-5xl">Terms</h1>
        <p className="mt-4 text-[16px]">
          Riyadh 500 is a public list. Rank is never for sale. The profiles on this version are examples. A nomination is a suggestion, not a place on the list.
        </p>
      </div>
    </>
  )
}
