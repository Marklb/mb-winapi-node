import * as ffi from 'ffi'
import * as ref from 'ref'
import * as ArrayType from 'ref-array'
import * as Struct from 'ref-struct'

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

export enum HWND_Z {
  /**
   * Places the window at the bottom of the Z order. If the hWnd parameter
   * identifies a topmost window, the window loses its topmost status and is
   * placed at the bottom of all other windows.
   */
  BOTTOM = 1,

  /**
   * Places the window at the top of the Z order.
   */
  HWND_TOP = 0,

  /**
   * Places the window above all non-topmost windows. The window maintains its
   * topmost position even when it is deactivated.
   */
  HWND_TOPMOST = -1,

  /**
   * Places the window above all non-topmost windows (that is, behind all
   * topmost windows). This flag has no effect if the window is already a
   * non-topmost window.
   */
  HWND_NOTOPMOST = -2
}

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

export enum SWP {
  /**
   * If the calling thread and the thread that owns the window are attached to
   * different input queues, the system posts the request to the thread that
   * owns the window. This prevents the calling thread from blocking its
   * execution while other threads process the request.
   */
  ASYNCWINDOWPOS = 0x4000,

  /**
   * Prevents generation of the WM_SYNCPAINT message.
   */
  DEFERERASE = 0x2000,

  /**
   * Draws a frame (defined in the window's class description) around the window.
   */
  DRAWFRAME = 0x0020,

  /**
   * Applies new frame styles set using the SetWindowLong function. Sends a
   * WM_NCCALCSIZE message to the window, even if the window's size is not
   * being changed. If this flag is not specified, WM_NCCALCSIZE is sent only
   * when the window's size is being changed.
   */
  FRAMECHANGED = 0x0020,

  /**
   * Hides the window.
   */
  HIDEWINDOW = 0x0080,

  /**
   * Does not activate the window. If this flag is not set, the window is
   * activated and moved to the top of either the topmost or non-topmost group
   * (depending on the setting of the hWndInsertAfter parameter).
   */
  NOACTIVATE = 0x0010,

  /**
   * Discards the entire contents of the client area. If this flag is not
   * specified, the valid contents of the client area are saved and copied back
   * into the client area after the window is sized or repositioned.
   */
  NOCOPYBITS = 0x0100,

  /**
   * Retains the current position (ignores X and Y parameters).
   */
  NOMOVE = 0x0002,

  /**
   * Does not change the owner window's position in the Z order.
   */
  NOOWNERZORDER = 0x0200,

  /**
   * Does not redraw changes. If this flag is set, no repainting of any kind
   * occurs. This applies to the client area, the nonclient area (including the
   * title bar and scroll bars), and any part of the parent window uncovered as
   * a result of the window being moved. When this flag is set, the application
   * must explicitly invalidate or redraw any parts of the window and parent
   * window that need redrawing.
   */
  NOREDRAW = 0x0008,

  /**
   * Same as the SWP_NOOWNERZORDER flag.
   */
  NOREPOSITION = 0x0200,

  /**
   * Prevents the window from receiving the WM_WINDOWPOSCHANGING message.
   */
  NOSENDCHANGING = 0x0400,

  /**
   * Retains the current size (ignores the cx and cy parameters).
   */
  NOSIZE = 0x0001,

  /**
   * Retains the current Z order (ignores the hWndInsertAfter parameter).
   */
  NOZORDER = 0x0004,

  /**
   * Displays the window.
   */
  SHOWWINDOW = 0x0040
}

export enum GWL {
  /**
   * Sets a new extended window style.
   */
  EXSTYLE = -20,

  /**
   * Sets a new application instance handle.
   */
  HINSTANCE = -6,

  /**
   * Sets a new identifier of the child window. The window cannot be a
   * top-level window.
   */
  ID = -12,

  /**
   * Sets a new window style.
   */
  STYLE = -16,

  /**
   * Sets the user data associated with the window. This data is intended for
   * use by the application that created the window. Its value is initially zero.
   */
  USERDATA = -21,

  /**
   * Sets a new address for the window procedure.
   *
   * You cannot change this attribute if the window does not belong to the same
   * process as the calling thread.
   */
  WNDPROC = -4
}

export enum GW {
  /**
   * The retrieved handle identifies the child window at the top of the Z order,
   * if the specified window is a parent window; otherwise, the retrieved handle
   * is NULL. The function examines only child windows of the specified window.
   * It does not examine descendant windows.
   */
  CHILD = 5,

  /**
   * The retrieved handle identifies the enabled popup window owned by the
   * specified window (the search uses the first such window found using
   * GW_HWNDNEXT); otherwise, if there are no enabled popup windows, the
   * retrieved handle is that of the specified window.
   */
  ENABLEDPOPUP = 6,

  /**
   * The retrieved handle identifies the window of the same type that is highest
   * in the Z order.
   *
   * If the specified window is a topmost window, the handle identifies a
   * topmost window. If the specified window is a top-level window, the handle
   * identifies a top-level window. If the specified window is a child window,
   * the handle identifies a sibling window.
   */
  HWNDFIRST = 0,

  /**
   * The retrieved handle identifies the window of the same type that is lowest
   * in the Z order.
   *
   * If the specified window is a topmost window, the handle identifies a
   * topmost window. If the specified window is a top-level window, the handle
   * identifies a top-level window. If the specified window is a child window,
   * the handle identifies a sibling window.
   */
  HWNDLAST = 1,

  /**
   * The retrieved handle identifies the window below the specified window in
   * the Z order.
   *
   * If the specified window is a topmost window, the handle identifies a
   * topmost window. If the specified window is a top-level window, the handle
   * identifies a top-level window. If the specified window is a child window,
   * the handle identifies a sibling window.
   */
  HWNDNEXT = 2,

  /**
   * The retrieved handle identifies the window above the specified window in
   * the Z order.
   *
   * If the specified window is a topmost window, the handle identifies a
   * topmost window. If the specified window is a top-level window, the handle
   * identifies a top-level window. If the specified window is a child window,
   * the handle identifies a sibling window.
   */
  HWNDPREV = 3,

  /**
   * The retrieved handle identifies the specified window's owner window, if
   * any. For more information, see [Owned Windows](https://msdn.microsoft.com/en-us/library/ms632599(v=VS.85).aspx).
   */
  OWNER = 4
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
  GetWindow: [HWND, [HWND, UINT]],
  IsIconic: [BOOL, [HWND]],
  IsWindowVisible: [BOOL, [HWND]],
  GetForegroundWindow: [HWND, []],
  SetForegroundWindow: [BOOL, [HWND]],
  SetWindowPos: [BOOL, [HWND, HWND, int, int, int, int, UINT]],
  SetWindowLongW: [LONG, [HWND, int, LONG]],
  SetWindowLongA: [LONG, [HWND, int, LONG]]
})

export const kernel32 = ffi.Library('kernel32', {
  OpenProcess: [HANDLE, [DWORD, BOOL ,DWORD]]
})

export const shell32 = ffi.Library('shell32', {
  SHGetPropertyStoreForWindow: [HRESULT, [HWND, REFIID, PTR(PVOID)]]
})
