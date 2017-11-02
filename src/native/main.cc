// #define WIN32_LEAN_AND_MEAN
#ifndef WIN32
    #define WIN32
#endif
#include <WinSock2.h>

#include <stdio.h>
#include <windows.h>
#include <stdlib.h>
#include <string.h>
#include <iostream>
#include <tchar.h>

#include <shellapi.h>
#include <propsys.h>
#include <propkey.h>
#include <propvarutil.h>
// #include "Propvarutil.h"
#pragma comment(lib, "Propsys.lib")

#include <Strsafe.h>

#include <nan.h>


std::wstring s2ws(const std::string& s)
{
    int len;
    int slength = (int)s.length() + 1;
    len = MultiByteToWideChar(CP_ACP, 0, s.c_str(), slength, 0, 0);
    wchar_t* buf = new wchar_t[len];
    MultiByteToWideChar(CP_ACP, 0, s.c_str(), slength, buf, len);
    std::wstring r(buf);
    delete[] buf;
    return r;
}

HRESULT MarkWindowAsUnpinnable(HWND hwnd)
{
    IPropertyStore *pps;
    HRESULT hr = SHGetPropertyStoreForWindow(hwnd, IID_PPV_ARGS(&pps));
    if (SUCCEEDED(hr)) {
        PROPVARIANT var;
        var.vt = VT_BOOL;
        var.boolVal = VARIANT_TRUE;
        hr = pps->SetValue(PKEY_AppUserModel_PreventPinning, var);
        pps->Release();
    }
    return hr;
}

HRESULT IPropertyStore_SetValue(IPropertyStore *pps,
    REFPROPERTYKEY pkey, PCWSTR pszValue)
{
    PROPVARIANT var;
    HRESULT hr = InitPropVariantFromString(pszValue, &var);
    if (SUCCEEDED(hr))
    {
        hr = pps->SetValue(pkey, var);
        PropVariantClear(&var);
    }
    return hr;
}

NAN_METHOD(GetAppUserModelIID)
{
    if (info.Length() < 1) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[0]->IsNumber()) {
        Nan::ThrowTypeError("Argument 0 must be a number!");
        return;
    }

    HWND hwnd = ((HWND)((int)info[0]->NumberValue()));

    // PKEY_Title
    std::string str;

    IPropertyStore *pps;
    HRESULT hr = SHGetPropertyStoreForWindow(hwnd, IID_PPV_ARGS(&pps));
    if (SUCCEEDED(hr)) {
        PROPVARIANT propvar = {0};

        hr = pps->GetValue(PKEY_AppUserModel_ID, &propvar);
        if (SUCCEEDED(hr)) {
            WCHAR szTitle[128];

            hr = PropVariantToString(propvar, szTitle, ARRAYSIZE(szTitle));
            if (SUCCEEDED(hr) || hr == STRSAFE_E_INSUFFICIENT_BUFFER) {
                std::wstring ws(szTitle);
                // std::string str(ws.begin(), ws.end());
                str.assign(ws.begin(), ws.end());
                // printf("PKEY_AppUserModel_ID: %s\n", str.c_str());
            } else {
                Nan::ThrowTypeError("PropVariantToString error!");
                return;
            }

            // WCHAR szKey[PKEYSTR_MAX];

            // hr = PSStringFromPropertyKey(PKEY_Title, szKey, ARRAYSIZE(szKey));
            // if (SUCCEEDED(hr)) {
            //     // szKey is now valid.
            // }


            PropVariantClear(&propvar);
        }
    }

    info.GetReturnValue().Set(Nan::New<v8::String>(str.c_str()).ToLocalChecked());
}

NAN_METHOD(SetAppUserModelIID)
{
    if (info.Length() < 2) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[0]->IsNumber()) {
        Nan::ThrowTypeError("Argument 0 must be a number!");
        return;
    }

    if (!info[1]->IsString()) {
        Nan::ThrowTypeError("Argument 1 must be a string!");
        return;
    }

    HWND hwnd = ((HWND)((int)info[0]->NumberValue()));

    v8::String::Utf8Value val(info[1]->ToString());
    std::string str (*val);
    std::wstring stemp = s2ws(str);
    LPCWSTR result = stemp.c_str();


    IPropertyStore *pps;
    HRESULT hr = SHGetPropertyStoreForWindow(hwnd, IID_PPV_ARGS(&pps));
    if (SUCCEEDED(hr)) {
        // PROPVARIANT var;
        // ... set up PROPVARIANT to contain AppUserModelID string
        // IPropertyStore_SetValue(pps,
        //     PKEY_AppUserModel_ID, L"MB.VSCode.Tmp3407");

        IPropertyStore_SetValue(pps,
            PKEY_AppUserModel_ID, result);

        // hr = pps->SetValue(PKEY_AppUserModel_ID, var);
        pps->Release();
    }
}






// NAN_METHOD is a Nan macro enabling convenient way of creating native node functions.
// It takes a method's name as a param. By C++ convention, I used the Capital cased name.
NAN_METHOD(Hello) {
    // Create an instance of V8's String type
    auto message = Nan::New("Hello from C++!").ToLocalChecked();
    // 'info' is a macro's "implicit" parameter - it's a bridge object between C++ and JavaScript runtimes
    // You would use info to both extract the parameters passed to a function as well as set the return value.
    info.GetReturnValue().Set(message);
}

// Module initialization logic
NAN_MODULE_INIT(Initialize) {
    // Export the `Hello` function (equivalent to `export function Hello (...)` in JS)
    NAN_EXPORT(target, Hello);
    NAN_EXPORT(target, GetAppUserModelIID);
    NAN_EXPORT(target, SetAppUserModelIID);
}

// Create the module called "addon" and initialize it with `Initialize` function (created with NAN_MODULE_INIT macro)
NODE_MODULE(addon, Initialize);
