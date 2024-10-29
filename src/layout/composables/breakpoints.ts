import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind)

export function useBreakpoint () {
    const xs = breakpoints.smaller('sm')
    const sm = breakpoints.between('sm', 'md')
    const md = breakpoints.between('md', 'lg')
    const lg = breakpoints.between('lg', 'xl')
    const xl = breakpoints.between('xl', '2xl')
    const xxl = breakpoints['2xl']

    return { xs, sm, md, lg, xl, xxl }
}
