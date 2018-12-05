import React from 'react';
import { Loading } from '../components/Loading';
import {Appointment} from "../utils/Appointment";
import {FormTambahLab} from "../containers/FormTambahLab";

export class TambahLab extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            pasien: {},
        }
        Appointment.getDetailPasien(this.props.match.params.id).then(response => {
            if(response.status === 200) {
                this.setState({
                    loading: false,
                    pasien: response.result
                })
            } else {
                alert('Data tidak ditemukan')
                this.props.history.push('/all-pasien')
            }
        })
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault()

        this.setState({
            loading: true
        })

        const data = new FormData(e.target)
        const dataJson = {}

        data.forEach((val, key) => {
            if(val !== ""){
                if(key === "id"){
                    const jsonId = {}
                    jsonId["id"] = val
                    dataJson["pasien"] = jsonId
                } else {
                    dataJson[key] = val
                }
            }
        })

        Appointment.postHasilLab(dataJson).then(response => {
            if(response.status === 200) {
                this.setState({
                    loading: false
                })
                alert(`Berhasil tambah hasil pasien ${this.state.pasien.nama}`)
            } else {
                this.setState({
                    loading: false
                })
                alert(`Gagal tambah hasil lab pasien ${this.state.pasien.nama}`)
            }
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading msg="Fetching Data..." />
            )
        } else {
            return (
                <FormTambahLab pasien={this.state.pasien} onSubmit={this.handleFormSubmit} />
            )
        }
    }
}