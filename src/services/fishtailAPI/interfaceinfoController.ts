// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addInterfaceinfo POST /api/interfaceinfo/add */
export async function addInterfaceinfoUsingPost(
  body: API.InterfaceinfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/interfaceinfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteInterfaceinfo POST /api/interfaceinfo/delete */
export async function deleteInterfaceinfoUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/interfaceinfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getInterfaceinfo GET /api/interfaceinfo/get */
export async function getInterfaceinfoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceinfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInterfaceinfo_>('/api/interfaceinfo/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** invokeInterfaceinfo POST /api/interfaceinfo/invoke */
export async function invokeInterfaceinfoUsingPost(
  body: API.InterfaceinfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/interfaceinfo/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listInterfaceinfoByPage POST /api/interfaceinfo/list/page */
export async function listInterfaceinfoByPageUsingPost(
  body: API.InterfaceinfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceinfo_>('/api/interfaceinfo/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** publishInterfaceinfo POST /api/interfaceinfo/publish */
export async function publishInterfaceinfoUsingPost(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/interfaceinfo/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** shutdownInterfaceinfo POST /api/interfaceinfo/shutdown */
export async function shutdownInterfaceinfoUsingPost(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/interfaceinfo/shutdown', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateInterfaceinfo POST /api/interfaceinfo/update */
export async function updateInterfaceinfoUsingPost(
  body: API.InterfaceinfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/interfaceinfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
