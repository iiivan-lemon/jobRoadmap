import { useLayoutEffect, useRef, useState } from 'react'
import {
  type Data,
  type Edge,
  Network,
  type Node,
  type Options
} from 'vis-network'

export interface UseVisNetworkOptions {
  options: Options
  nodes: Node[]
  edges: Edge[]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (props: UseVisNetworkOptions) => {
  const { edges, nodes, options } = props

  const [
    network,
    addNetwork
  ] = useState<Network | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const data: Data = { nodes, edges }

  useLayoutEffect(() => {
    if (ref.current != null) {
      const instance = new Network(ref.current, data, options)
      addNetwork(instance)
    }
    return () => network?.destroy()
  }, [])

  return {
    network,
    ref
  }
}
