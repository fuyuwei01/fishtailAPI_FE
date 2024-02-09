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
