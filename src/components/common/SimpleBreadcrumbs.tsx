import React, { Dispatch, FC, SetStateAction } from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'

interface BreadcrumbsProps {
  title?: string
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

// function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
//   event.preventDefault()
//   console.info('You clicked a breadcrumb.')
// }

const SimpleBreadcrumbs: FC<BreadcrumbsProps> = ({ title, setModalIsOpen }) => (
  <Breadcrumbs aria-label='breadcrumb'>
    <Link color='inherit' href='/'>
      首頁
    </Link>
    <Typography
      color='textPrimary'
      onMouseEnter={() => {
        setModalIsOpen(true)
      }}
    >
      {title}
    </Typography>
  </Breadcrumbs>
)

export default SimpleBreadcrumbs
