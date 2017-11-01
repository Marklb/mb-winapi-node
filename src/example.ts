import * as winApi from './main'
import * as utils from './utilities'

const procs = utils.getProcesses()
// console.log(procs)

const list: utils.Process[] = []
for (const proc of procs) {
  // if (proc.title !== '') { console.log(proc.title) }
  // if (proc.title.indexOf(' - Visual Studio Code') !== -1) {
  //   list.push(proc)
  // }
  // if (proc.title.indexOf('Notepad++') !== -1) {
  //   list.push(proc)
  // }
  if (proc.title.indexOf('Untitled - Notepad') !== -1) {
    list.push(proc)
  }
}

console.log(list)

const main = async () => {
  // console.log(await utils.setAppUserModelIID(list[0].hWnd, 'test.253786923459876'))
  // console.log(await utils.getAppUserModelIID(list[0].hWnd))

  await utils.test()
}
main()


// https://github.com/luapower/winapi/blob/master/winapi/propsys.lua
// https://github.com/rpeev/fzeet/blob/master/lib/fzeet/windows/propsys.rb
// https://hotkeyit.github.io/v2/docs/commands/WinApi.htm
// http://www.rubydoc.info/gems/fzeet/0.6.1/Fzeet/Windows
// http://c.devhelping.com/article/15717815/Is+it+possible+to+inherit+the+default+IShellFolder+implementation%3F
// https://pypkg.com/pypi/soundcard/f/soundcard/mediafoundation.py
// https://github.com/Wiladams/TINN/blob/master/experimental/test_MMDevice_ffi.lua
