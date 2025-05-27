import { Separator } from "@/components/atoms/ui/separator"

export default function Timeline({ children }: React.ComponentProps<"div">) {
  return (
    <div className="px-4 w-full h-full flex flex-col gap-4 items-center">
      {!Array.isArray(children) ? children : children.map((i, e) => (
        <TimelineItem key={e} last={e == children.length - 1}>
          {i}
        </TimelineItem>
      ))}
    </div>
  )
}

type TimelineItemProps = {
  last: boolean
} & React.ComponentProps<"div">

function TimelineItem({ children, last }: TimelineItemProps) {
  return (
    <div className="h-full w-full flex flex-row gap-6 items-start justify-center">
      <TimelineSegment last={last} />
      <div className="h-full w-full flex flex-col gap-4 items-start">
        {children}
        {!last && <Separator orientation="horizontal"/>}
      </div>
    </div>
  )
}

type TimelineSegmentProps = {
  last: boolean
} & React.ComponentProps<"div">

function TimelineSegment({ last }: TimelineSegmentProps) {
  return (

    <div className={`relative w-min h-full flex flex-col items-center justify-center mt-1 ${!last && "after:bg-slate-700 dark:after:bg-slate-400 after:absolute after:rounded-full after:box-content after:border-t-slate-400 after:border-t-20 after:border-b-8 after:-translate-x-1/2 after:top-1 after:left-1/2 after:w-1 after:h-full after:content-['']"}`}>
      <TimelinePoint />
    </div>
  )
}

function TimelinePoint() {
  return (
    <div className="z-10 w-5 rounded-full h-5 bg-slate-700 dark:bg-slate-400 flex flex-col items-center justify-center" >
      <div className={`w-3 h-3 rounded-full z-10 bg-slate-50 dark:bg-slate-950`} />
    </div>
  )
}
