#r "E:\Git\mb-winapi-node\Microsoft.WindowsAPICodePack.dll"
#r "E:\Git\mb-winapi-node\Microsoft.WindowsAPICodePack.Shell.dll"
// #r "c:\Users\mberry\dev_home\projects\tmp_projects\edgejs-test\Microsoft.WindowsAPICodePack.dll"
// #r "c:\Users\mberry\dev_home\projects\tmp_projects\edgejs-test\Microsoft.WindowsAPICodePack.Shell.dll"
#r "C:\Windows\assembly\GAC_MSIL\PresentationFramework\3.0.0.0__31bf3856ad364e35\PresentationFramework.dll"
#r "C:\Windows\assembly\GAC_32\PresentationCore\3.0.0.0__31bf3856ad364e35\PresentationCore.dll"
#r "C:\Windows\assembly\GAC_MSIL\WindowsBase\3.0.0.0__31bf3856ad364e35\WindowsBase.dll"

// DLLs path "C:\Windows\assembly"

using System;
using System.Threading.Tasks;
using System.Windows;
using Microsoft.WindowsAPICodePack;
using Microsoft.WindowsAPICodePack.Taskbar;

public class Startup
{
    public async Task<object> Invoke(dynamic input)
    {
        // TaskbarManager.Instance.SetApplicationIdForSpecificWindow((IntPtr)input.hWnd, (string)input.appId);
        // TaskbarNativeMethods.
        // Taskbar.TaskbarNativeMethods.SetWindowAppId((IntPtr)input.hWnd, (string)input.appId);

        IntPtr hwnd = (IntPtr)input.hWnd;

        // Microsoft.WindowsAPICodePack.Shell.PropertySystem.IPropertyStore propStore;
        Guid guid = new Guid(ShellIIDGuid.IPropertyStore);
        int rc = SHGetPropertyStoreForWindow(
            hwnd,
            ref guid,
            null);

        return null;
    }
}
