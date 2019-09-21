import * as ref from 'ref'

import * as winApi from './winApi'
import * as utils from './utilities'

// private IntPtr GetProcessWindow(int processID)
// {
//     // Now need to run a loop to get the correct window for process.
//     bool bFound = false;
//     IntPtr prevWindow=IntPtr.Zero;

//     while (!bFound)
//     {
//         IntPtr desktopWindow = NativeMethods.GetDesktopWindow();
//         if (desktopWindow == IntPtr.Zero)
//             break;

//         IntPtr nextWindow = NativeMethods.GetChildHandle(desktopWindow, prevWindow, null, null);
//         if (nextWindow == IntPtr.Zero)
//             break;

//         // Check whether window belongs to the correct process.
//         int procId = -1;
//         NativeMethods.GetWindowThreadProcessId(nextWindow, out procId);

//         if (procId == processID)
//         {

//             return nextWindow;
//         }

//         prevWindow = nextWindow;
//     }

//     return IntPtr.Zero;
// }
// HWND GetProcessWindow( DWORD processId )
// tslint:disable:max-line-length
// {
// 	// Now need to run a loop to get the correct window for process.
// 	bool bFound = false;
// 	HWND prevWindow = 0;

// 	while ( ! bFound ) {
// 		HWND desktopWindow = GetDesktopWindow();
// 		if ( ! desktopWindow )
// 			break;

// 		HWND nextWindow = FindWindowEx( desktopWindow, prevWindow, NULL, NULL );
// 		if ( ! nextWindow )
// 			break;

// 		// Check whether window belongs to the correct process.
// 		DWORD procId = -1;
// 		GetWindowThreadProcessId( nextWindow, &procId );

// 		if ( procId == processId ) {
// 			// Add additional checks. In my case, I had to bring the window to front so these checks were necessary.
// 			wchar_t windowText[ 1024 ];
// 			if ( IsWindowVisible( nextWindow ) && ! IsIconic( nextWindow ) && GetWindowText( nextWindow, ( LPWSTR )windowText, sizeof( windowText ) / sizeof( wchar_t ) )
// 				&& ! GetParent( nextWindow ) )
// 				return nextWindow;
// 		}

// 		prevWindow = nextWindow;
// 	}

// 	return 0;
// }

function GetWindowText(hWnd: number) {
  // Get Window Text
  // const length = user32.GetWindowTextLengthA(procInfo.hWnd) // May have an error
  const pStr = Buffer.alloc(2024)
  winApi.user32.GetWindowTextA(hWnd, pStr, 2024)
  let str = pStr.toString('utf-8')
  const terminatingNullPos = str.indexOf('\u0000')
  if (terminatingNullPos >= 0) { str = str.substr(0, terminatingNullPos) }
  // console.log('Title: ', str)
  return str
}

function GetProcessWindow(processId: number) {
  const bFound = false
  let prevWindow = 0

  while (!bFound) {
    const desktopWindow = winApi.user32.GetDesktopWindow()
    if (desktopWindow === 0) {
      break
    }

    const nextWindow = winApi.user32.FindWindowExA(desktopWindow, prevWindow, null, null)
    if (!nextWindow) {
      break
    }

    const lpdwProcessId = ref.alloc(winApi.DWORD)
    winApi.user32.GetWindowThreadProcessId(nextWindow, lpdwProcessId)
    const actualNumber = ref.deref(lpdwProcessId)
    const procId = actualNumber

    if (procId === processId) {
      if (winApi.user32.IsWindowVisible(nextWindow) && !winApi.user32.IsIconic(nextWindow) && GetWindowText(nextWindow) && !winApi.user32.GetParent(nextWindow)) {
        return nextWindow
      }
      // return nextWindow
    }

    prevWindow = nextWindow
  }

  return 0
}

function GetWindowRect(hWnd: number) {
  const buf = new winApi.RECT
  buf.count = 0
  const bufRef = buf['ref.buffer']
  const rectResult = winApi.user32.GetWindowRect(hWnd, bufRef)
  // console.log('rectResult', rectResult, { top: buf.top, right: buf.right, bottom: buf.bottom, left: buf.left })
  return { top: buf.top, right: buf.right, bottom: buf.bottom, left: buf.left }
}

function getProcessesExample() {
  const procs = utils.getProcesses()
  // console.log(procs)

  const list: utils.Process[] = []
  const list2: utils.Process[] = []
  for (const proc of procs) {
    // if (proc.title !== '') { console.log(proc.title) }
    // if (proc.title.indexOf(' - Visual Studio Code') !== -1) {
    //   list.push(proc)
    // }
    // if (proc.title.indexOf('Notepad++') !== -1) {
    //   list.push(proc)
    // }
    // if (proc.title.indexOf('Untitled - Notepad') !== -1) {
    //   list.push(proc)
    // }
    // if (proc.title.indexOf('Hulu') !== -1) {
    //   list.push(proc)
    // }
    if (proc.pid === 13524) {
      list.push(proc)
    }
  }

  console.log(list)
  for (const item of (list || [])) {
    // const result = GetProcessWindow(item.pid)
    // // console.log(result)
    // const proc = procs.find(p => p.hWnd === result)
    // console.log('proc', proc)

    // console.log('rect', GetWindowRect(result))
    // // winApi.user32.SetForegroundWindow(result)

    if (winApi.user32.IsWindowVisible(item.hWnd)) {
      console.log('Visible', item, winApi.user32.GetParent(item.hWnd))
    }
  }

  // const result2 = GetProcessWindow(13524)
  // console.log(result2)
  // const proc2 = procs.find(p => p.hWnd === result2)
  // console.log('proc2', proc2)
  // console.log('rect', GetWindowRect(result2))
}

function getWindowProcessesExample() {
  const procs = utils.getWindows()
  // console.log(procs)

  // const list: utils.Process[] = []
  // for (const proc of procs) {
  //   // if (proc.title !== '') { console.log(proc.title) }
  //   // if (proc.title.indexOf(' - Visual Studio Code') !== -1) {
  //   //   list.push(proc)
  //   // }
  //   // if (proc.title.indexOf('Notepad++') !== -1) {
  //   //   list.push(proc)
  //   // }
  //   if (proc.title.indexOf('Untitled - Notepad') !== -1) {
  //     list.push(proc)
  //   }
  // }

  // console.log('\nFound:')
  // console.log(list)
}

function appUserModelIIDExample() {
  // await utils.setAppUserModelIID(list[0].hWnd, 'test.25378692345987656')
  // await utils.setAppUserModelIID(list[1].hWnd, 'aesk.25378692345987656')
  // await utils.setAppUserModelIID(list[2].hWnd, 'besp.25378692345987656')

  // console.log(await utils.getAppUserModelIID(list[0].hWnd))
  // console.log(await utils.getAppUserModelIID(list[1].hWnd))
  // console.log(await utils.getAppUserModelIID(list[2].hWnd))


  // console.log(await utils.setAppUserModelIID(list[0].hWnd, 'test.253786923459876'))
  // console.log(await utils.getAppUserModelIID(list[0].hWnd))

  // await utils.test()
}

const main = async () => {
  getProcessesExample()
  // getWindowProcessesExample()
}
main()


// https://github.com/luapower/winapi/blob/master/winapi/propsys.lua
// https://github.com/rpeev/fzeet/blob/master/lib/fzeet/windows/propsys.rb
// https://hotkeyit.github.io/v2/docs/commands/WinApi.htm
// http://www.rubydoc.info/gems/fzeet/0.6.1/Fzeet/Windows
// http://c.devhelping.com/article/15717815/Is+it+possible+to+inherit+the+default+IShellFolder+implementation%3F
// https://pypkg.com/pypi/soundcard/f/soundcard/mediafoundation.py
// https://github.com/Wiladams/TINN/blob/master/experimental/test_MMDevice_ffi.lua
