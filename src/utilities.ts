import * as winApi from './winApi'
import * as ffi from 'ffi'
import * as ref from 'ref'
import * as ArrayType from 'ref-array'
import * as Struct from 'ref-struct'
// const edge = require('./edge-promise')
// const { IsPrime } = require('../build/Release/addon')
const addon = require('../build/Release/addon')
const path = require('path')

// const cSharpScriptsPath = "e:/Git/mb-winapi-node/src/cs-scripts"
// const SetApplicationIdForSpecificWindow = edge.func(path.join(cSharpScriptsPath, 'setAppUserModelIID.cs'))
// const GetApplicationIdForSpecificWindow = edge.func(path.join(cSharpScriptsPath, 'getAppUserModelIID.cs'))

const user32 = winApi.user32
const kernel32 = winApi.kernel32
const shell32 = winApi.shell32

export const ProcessInfo = Struct({
  hWnd: winApi.HWND,
  pid: winApi.int
})

export const ProcessesList = Struct({
  count: winApi.int,
  list: winApi.ARRAY(ProcessInfo, 2024)
})


export class Process {
  hWnd: number
  pid: number
  title: string
  path: string
}

export const getHwndEnumWindowProc = ffi.Callback(winApi.BOOL, [winApi.HWND, ref.refType(ProcessesList)], (hWnd, lParam) => {
  const lpdwProcessId = ref.alloc(winApi.DWORD)
  user32.GetWindowThreadProcessId(hWnd, lpdwProcessId)
  const actualNumber = ref.deref(lpdwProcessId)
  // console.log(`lpdwProcessId: ${actualNumber}`)
  // console.log(lParam)
  const tmp = ref.deref(lParam)
  // console.log(tmp)
  // console.log(`lpdwProcessId: ${actualNumber} : ${tmp.count}`)

  // hWnd.copy(tmp.list[tmp.count].hWnd)
  tmp.list[tmp.count].hWnd = hWnd
  tmp.list[tmp.count].pid = actualNumber
  tmp.count++

  return true
})


export const getProcesses = (): Process[] => {
  const buf = new ProcessesList
  buf.count = 0
  const bufRef = buf['ref.buffer']
  user32.EnumWindows(getHwndEnumWindowProc, bufRef)

  const procs: Process[] = []
  for (let i = 0; i < buf.count; i++) {
    const procInfo = buf.list[i]
    // console.log(procInfo)

    const proc: Process = new Process

    proc.hWnd = procInfo.hWnd
    proc.pid = procInfo.pid

    // Get Window Text
    // const length = user32.GetWindowTextLengthA(procInfo.hWnd) // May have an error
    const pStr = Buffer.alloc(2024)
    user32.GetWindowTextA(procInfo.hWnd, pStr, 2024)
    let str = pStr.toString('utf-8')
    const terminatingNullPos = str.indexOf('\u0000')
    if (terminatingNullPos >= 0) { str = str.substr(0, terminatingNullPos) }
    // console.log("Title: ",str)
    proc.title = str


    const pStr2 = Buffer.alloc(2024)
    user32.GetWindowModuleFileName(procInfo.hWnd, pStr2, 2024)
    let str2 = pStr2.toString('utf-8')
    const terminatingNullPos2 = str2.indexOf('\u0000')
    if (terminatingNullPos2 >= 0) { str2 = str2.substr(0, terminatingNullPos2) }
    // console.log("Path: ",str2)
    proc.path = str2



    // procs.push(buf.list[i])
    procs.push(proc)
  }

  return procs
}

export function isMainWindow(hWnd: number): boolean {
  return user32.GetWindow(hWnd, winApi.GW.OWNER) === 0 && user32.IsWindowVisible(hWnd)
}

export function getWindows(): Process[] {
  const procs: Process[] = getProcesses()

  const winProcs: Process[] = []
  for (const proc of procs) {
    if (isMainWindow(proc.hWnd)) {
      winProcs.push(proc)

      // console.log(proc)

      // console.log(user32.IsWindowVisible(proc.hWnd))
    }
  }

  return winProcs
}

export const setAppUserModelIID = async (hWnd: number, appId: string): Promise<any> => {
  // return SetApplicationIdForSpecificWindow({hWnd: hWnd, appId: appId})
  addon.SetAppUserModelIID(hWnd, appId)
  return
}

export const getAppUserModelIID = async (hWnd: number): Promise<any> => {
  // return GetApplicationIdForSpecificWindow({hWnd: hWnd})
  return addon.GetAppUserModelIID(hWnd)
}

export const test = async (): Promise<any> => {
  console.log('Test')

}






































export const old___setAppUserModelIID = (hWnd): void => {
  const IID_IPropertyStore = new winApi.UUID
  // console.log(IID_IPropertyStore)
  IID_IPropertyStore.Data1 = 0x886D8EEB
  IID_IPropertyStore.Data2 = 0x8CF2
  IID_IPropertyStore.Data3 = 0x4446
  '8D;02;CD;BA;1D;BD;CF;99'.split(';').forEach(function(e, i) {
    IID_IPropertyStore.Data4[i] = parseInt(e, 16)
  })

  console.log(IID_IPropertyStore)

  const ppv = ref.alloc(winApi.PTR(winApi.PVOID))

  // console.log(IID_IPropertyStore['ref.buffer'].address())
  console.log(IID_IPropertyStore['ref.buffer'])
  console.log(ppv)

  shell32.SHGetPropertyStoreForWindow(hWnd, IID_IPropertyStore['ref.buffer'], ppv)

  console.log(ppv)

  //
  const propKey_AppUserModel_ID = new winApi.PROPERTYKEY
  propKey_AppUserModel_ID.fmtid.Data1 = 0x9F4C2855
  propKey_AppUserModel_ID.fmtid.Data2 = 0x9F79
  propKey_AppUserModel_ID.fmtid.Data3 = 0x4B39
  'A8;D0;E1;D4;2D;E1;D5;F3'.split(';').forEach(function(e, i) {
    propKey_AppUserModel_ID.fmtid.Data4[i] = parseInt(e, 16)
  })
  propKey_AppUserModel_ID.pid = 5
  // console.log(propKey_AppUserModel_ID)

  const propKey_AppUserModel_ToastActivatorCLSID = new winApi.PROPERTYKEY
  propKey_AppUserModel_ToastActivatorCLSID.fmtid.Data1 = 0x9F4C2855
  propKey_AppUserModel_ToastActivatorCLSID.fmtid.Data2 = 0x9F79
  propKey_AppUserModel_ToastActivatorCLSID.fmtid.Data3 = 0x4B39
  'A8;D0;E1;D4;2D;E1;D5;F3'.split(';').forEach(function(e, i) {
    propKey_AppUserModel_ToastActivatorCLSID.fmtid.Data4[i] = parseInt(e, 16)
  })
  propKey_AppUserModel_ToastActivatorCLSID.pid = 26
  // console.log(propKey_AppUserModel_ToastActivatorCLSID)







}
