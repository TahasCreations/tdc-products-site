declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string
      'ar'?: boolean | ''
      'ar-modes'?: string
      'camera-controls'?: boolean | ''
      'tone-mapping'?: string
      'shadow-intensity'?: string | number
      poster?: string
      alt?: string
    }
  }
}


