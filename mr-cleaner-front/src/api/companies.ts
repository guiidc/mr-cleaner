import api from "@/api/index";

export type Company = {
  id: string
  name: string,
  email: string,
  phone: string,
  coordinate_x: number,
  coordinate_y: number,
}

export type SaveCompany = {
  name: string,
  email: string,
  phone: string,
  coordinate_x: string,
  coordinate_y: string,
}

export async function getCompaniesService() {
  return api.get<Company[]>("/v1/companies")
}

export async function saveCompanyService(requestBody: SaveCompany) {
  return api.post<Company>("/v1/companies", {
    name: requestBody.name,
    email: requestBody.email,
    phone: requestBody.phone.replace(/\D/g, ""),
    coordinate_x: Number(requestBody.coordinate_x.replace(",", ".")),
    coordinate_y: Number(requestBody.coordinate_y.replace(",", ".")),
  })
}

export const removeCompanyService = (id: string) => api.delete(`/v1/companies/${id}`)

export const updateCompanyService = (id: string, requestBody: SaveCompany) => api.put(`/v1/companies/${id}`, {
  name: requestBody.name,
  email: requestBody.email,
  phone: requestBody.phone.replace(/\D/g, ""),
  coordinate_x: Number(requestBody.coordinate_x.replace(",", ".")),
  coordinate_y: Number(requestBody.coordinate_y.replace(",", ".")),
})
