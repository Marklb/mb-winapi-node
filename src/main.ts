import * as ffi from 'ffi'
import * as ref from 'ref'
import * as ArrayType from 'ref-array'
import * as Struct from 'ref-struct'
import * as utilities from './utilities'

export const utils = utilities

// Declarations
export namespace D {
  export const UNICODE: boolean = false
  export const _WIN64: boolean = false
}

// Helpers
export const PTR = (type) => ref.refType(type)

export const TYPEDEF = (type) => ref.refType(type)

export const CALLBACK = (ret, args) => TYPEDEF(PVOID)

export const ARRAY = (type, length) => {
  const fields = {}
  Array.apply(null, new Array(length)).forEach((x, i) => {
    fields[i] = type
  })
  return Struct(fields)
}

// Windows Types
export const int = ref.types.int
export const uint = ref.types.uint
export const __int64 = ref.types.int64
export const long = ref.types.long
export const VOID = ref.types.void
export const CHAR = ref.types.char
export const WCHAR = ref.types.ushort
export const DWORD = ref.types.ulong
export const BOOL = ref.types.bool
export const UINT = ref.types.uint
export const LONG = ref.types.long
export const ULONG = ref.types.ulong
export const SHORT = ref.types.short
export const USHORT = ref.types.ushort
export const BYTE = ref.types.byte
export const INT = int
export const PVOID = PTR(VOID)
// export const HANDLE = PVOID
export const HANDLE = long
export const HWND = HANDLE
export const LPSTR = PTR(CHAR)
export const LPWSTR = PTR(WCHAR)
export const PTSTR = (D.UNICODE) ? LPWSTR : LPSTR
export const LPTSTR = (D.UNICODE) ? LPWSTR : LPSTR
export const HRESULT = LONG
export const LPDWORD = PTR(DWORD)
export const LONG_PTR = (D._WIN64) ? __int64 : long
// export const LPARAM = LONG_PTR
export const LPARAM = PVOID

export const WNDENUMPROC = CALLBACK(BOOL, [HWND, LPARAM])

export const UUID = Struct({
  Data1: ULONG,
  Data2: USHORT,
  Data3: USHORT,
  Data4: ARRAY(BYTE, 8)
})

// https://msdn.microsoft.com/en-us/library/dd354925.aspx
// export const GUID = Struct({
//   Data1: ARRAY(ref.types.byte, 4),
//   Data2: ARRAY(ref.types.byte, 2),
//   Data3: ARRAY(ref.types.byte, 2),
//   Data4: ARRAY(ref.types.byte, 2),
//   Data5: ARRAY(ref.types.byte, 6)
// })

export const GUID = UUID
export const IID = GUID
export const REFIID = PTR(IID)

export const PROPERTYKEY = Struct({
  fmtid: GUID,
  pid: uint
})

export const IPropertyStore = Struct({

})

export enum SW {
  /**
   * Hides the window and activates another window.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  HIDE = 0,

  /**
   * Activates and displays a window. If the window is minimized or maximized,
   * the system restores it to its original size and position. An application
   * should specify this flag when displaying the window for the first time.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  SHOWNORMAL = 1,

  /**
   * Activates the window and displays it as a minimized window.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  SHOWMINIMIZED = 2,

  /**
   * Activates the window and displays it as a maximized window.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  SHOWMAXIMIZED = 3,

  /**
   * Maximizes the specified window.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  MAXIMIZE = 3,

  /**
   * Displays a window in its most recent size and position.
   * This value is similar to SW_SHOWNORMAL, except that the window is not activated.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  SHOWNOACTIVATE = 4,

  /**
   * Activates the window and displays it in its current size and position.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  SHOW = 5,

  /**
   * Minimizes the specified window and activates the next top-level window in the Z order.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  MINIMIZE = 6,

  /**
   * Displays the window as a minimized window. This value is similar to
   * SW_SHOWMINIMIZED, except the window is not activated.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  SHOWMINNOACTIVE = 7,

  /**
   * Displays the window in its current size and position. This value is similar
   * to SW_SHOW, except that the window is not activated.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  SHOWNA = 8,

  /**
   * Activates and displays the window. If the window is minimized or maximized,
   * the system restores it to its original size and position. An application
   * should specify this flag when restoring a minimized window.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  RESTORE = 9,

  /**
   * Sets the show state based on the SW_ value specified in the STARTUPINFO
   * structure passed to the CreateProcess function by the program that started
   * the application.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  SHOWDEFAULT = 10,

  /**
   * Minimizes a window, even if the thread that owns the window is not responding.
   * This flag should only be used when minimizing windows from a different thread.
   * https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
   */
  FORCEMINIMIZE = 11
}


// Libraries
export const user32 = ffi.Library('user32', {
  ShowWindow: [BOOL, [HWND, int]],
  EnumWindows: [BOOL, [WNDENUMPROC, LPARAM]],
  GetWindowThreadProcessId: [DWORD, [HWND, LPDWORD]],
  GetWindowTextLengthW: [int, [HWND]],
  GetWindowTextLengthA: [int, [HWND]],
  GetWindowTextW: [int, [HWND, LPTSTR, int]],
  GetWindowTextA: [int, [HWND, LPTSTR, int]],
  GetClassNameW: [int, [HWND, LPTSTR, int]],
  GetClassNameA: [int, [HWND, LPTSTR, int]],
  GetWindowModuleFileName: [UINT, [HWND, LPTSTR, UINT]],
  GetShellWindow: [HWND, []],
  IsIconic: [BOOL, [HWND]],
  IsWindowVisible: [BOOL, [HWND]]
})

export const kernel32 = ffi.Library('kernel32', {
  OpenProcess: [HANDLE, [DWORD, BOOL ,DWORD]]
})

export const shell32 = ffi.Library('shell32', {
  SHGetPropertyStoreForWindow: [HRESULT, [HWND, REFIID, PTR(PVOID)]]
})
