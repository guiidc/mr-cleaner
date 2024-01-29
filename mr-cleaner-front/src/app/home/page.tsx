'use client'

import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import ClientsList from "@/components/ClientsList";
import {FormEvent, useEffect, useState} from "react";
import {
  Company,
  saveCompanyService,
  getCompaniesService,
  removeCompanyService,
  SaveCompany,
  updateCompanyService
} from "@/api/companies";
import Button from "@/components/Button";
import styles from './styles.module.scss'
import {ModalNewCompany} from "@/components/ModalNewCompany";
import {ToastContainer, toast} from "react-toastify";
import ModalRemoveCompany from "@/components/ModalRemoveCompany";
import {getShortestPathService, PathData} from "@/api/paths";
import ModalShortestPath from "@/components/ModalShortedPath";
import Input from "@/components/Input";
import { FaSearch } from "react-icons/fa";


export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [showNewCompanyModal, setShowNewCompanyModal] = useState<boolean>(false)
  const [showRemoveCompanyModal, setShowRemoveCompanyModal] = useState<boolean>(false)
  const [showShortestPathModal, setShowShortestPathModal] = useState<boolean>(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [pathData, setPathData] = useState<PathData>({path: [], distance: 0})
  const [search, setSearch] = useState<string>("")
  
  const loadCompanies = async () => {
    try {
      const {data} = await getCompaniesService()
      setCompanies(data)
    } catch (err) {
      console.log(err)
    }
  }
  
  const handleNewCompanyModal = (show: boolean, company: Company | null) => {
    setSelectedCompany(company)
    setShowNewCompanyModal(show)
  }
  
  const saveCompany = async (company: SaveCompany) => {
    try {
      await saveCompanyService(company)
      await loadCompanies()
      setShowNewCompanyModal(false)
      toast("Empresa salva com sucesso!", {
        type: "success",
      })
    } catch (err) {
      if (err.isAxiosError && err.response?.data?.message) {
        toast(err.response.data.message, {type: "error"})
      } else {
        toast("Ocorreu um erro ao salvar a empresa", {type: "error"})
      }
      console.log(err)
    }
  }
  
  const updateCompany = async (company: SaveCompany) => {
    if (!selectedCompany) return
    
    try {
      await updateCompanyService(selectedCompany.id, company)
      await loadCompanies()
      setShowNewCompanyModal(false)
      toast("Empresa salva com sucesso!", {
        type: "success",
      })
    } catch (err) {
      if (err.isAxiosError && err.response?.data?.message) {
        toast(err.response.data.message, {type: "error"})
      } else {
        toast("Ocorreu um erro ao salvar a empresa", {type: "error"})
      }
      console.log(err)
    }
  }
  
  const handleRemoveCompanyModal = (show: boolean, company: Company | null) => {
    setSelectedCompany(company)
    setShowRemoveCompanyModal(show)
  }
  
  const handleRemoveCompany = async (event: FormEvent) => {
    event.preventDefault()
    if (!selectedCompany) return
    
    try {
      const {data} = await removeCompanyService(selectedCompany?.id)
      toast(data.message, {type: "success"})
      await loadCompanies()
      handleRemoveCompanyModal(false, null)
    } catch (err) {
      if (err.isAxiosError && err.response?.data?.message) {
        toast(err.response.data.message, {type: "error"})
      } else {
        toast("Ocorreu um erro ao remover a empresa", {type: "error"})
      }
    }
  }
  
  const getShortestPath = async () => {
    try {
      const {data} = await getShortestPathService(0, 0)
      setPathData(data)
    } catch (err) {
      if (err.isAxiosError && err.response?.data?.message) {
        toast(err.response.data.message, {type: "error"})
      } else {
        toast("Ocorreu um erro ao calcular a rota", {type: "error"})
      }
    }
  }
  
  const handleShowShortestPathModal = async (show: boolean) => {
    await getShortestPath()
    setShowShortestPathModal(show)
  }
  
  const handleSearch = (event: FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }
  
  const filterCompanies = (companies: Company[], search: string) => {
    if (!search) return companies
    
    return companies.filter(company => {
      return company.name.toLowerCase().includes(search.toLowerCase())
      || company.email.toLowerCase().includes(search.toLowerCase())
      || company.phone.toLowerCase().includes(search.toLowerCase())
    })
  }
  
  useEffect(() => {
    loadCompanies()
  }, [])
  
  return (
    <PrivateRoute>
      <section className={styles.mainSection}>
        <div className={styles.buttonsContainer}>
          <Button text="Nova Empresa" onClick={() => handleNewCompanyModal(true, null)}/>
          <Button text="Calcular rota" onClick={() => handleShowShortestPathModal(true)}/>
        </div>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon}/>
          <Input placeholder="Buscar..." onChange={handleSearch} value={search} name={search} />
        </div>
        <ClientsList
          companies={filterCompanies(companies, search)}
          onShowRemoveCompanyModal={handleRemoveCompanyModal}
          onShowUpdateCompanyModal={handleNewCompanyModal}
        />
      </section>
      {showNewCompanyModal &&
          <ModalNewCompany
              title={selectedCompany ? "Atualizar Empresa" : "Adicionar Empresa"}
              buttonText={selectedCompany ? "Atualizar Empresa" : "Adicionar Empresa"}
              handleClose={() => handleNewCompanyModal(false, null)}
              handleSave={saveCompany}
              handleUpdate={updateCompany}
              selectedCompany={selectedCompany}
          />}
      {showRemoveCompanyModal && (
        <ModalRemoveCompany
          handleClose={handleRemoveCompanyModal}
          handleSubmit={handleRemoveCompany}
        />)}
      
      {showShortestPathModal && (
        <ModalShortestPath
          handleClose={handleShowShortestPathModal}
          pathData={pathData}
        />
      )}
      <ToastContainer/>
    </PrivateRoute>
  )
}
