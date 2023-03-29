import React from 'react'
import { type ComponentStory, type ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { Page } from './Page'

export default {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Page>

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />

export const LoggedOut = Template.bind({})

export const LoggedIn = Template.bind({})

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
LoggedIn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const loginButton = await canvas.getByRole('button', { name: /Log in/i })
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression,@typescript-eslint/await-thenable
  await userEvent.click(loginButton)
}
