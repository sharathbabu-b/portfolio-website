import assert from 'node:assert/strict'
import test from 'node:test'
import { retrievePortfolioContext } from './rag.js'

test('retrieves relevant project details for the portfolio assistant', () => {
  const context = retrievePortfolioContext('Which food delivery project uses Socket.io for live driver tracking?')

  assert.match(context, /Project: Tastr/)
  assert.match(context, /Socket\.io/)
  assert.match(context, /live driver tracking/i)
})

test('retrieves the matching education record', () => {
  const context = retrievePortfolioContext('Which college did he attend for mechanical engineering?')

  assert.match(context, /Education: Bachelor of Technology, Mechanical Engineering/)
  assert.match(context, /G\. Pullaiah College of Engineering and Technology/)
})

test('returns no context when the portfolio has no relevant details', () => {
  assert.equal(retrievePortfolioContext('quantum photography'), '')
})
