import { Helmet } from "react-helmet-async"
import FormDialog from "../components/dialogs/FormDialog"
import FavoritesTable from "../components/tables/FavoritesTable"
import { FilterForm } from "../components/forms/FilterForm"

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Welcome | Favorites Data</title>
            </Helmet>
            <main className="mt-[85px] md:mx-5 sm:mx-4">
                <section className="bg-white rounded-[12px] py-3 px-4 mb-5">
                    <h3 className="text-[18px]">Filter Items</h3>
                    <FilterForm />
                </section>
                <section className="bg-white rounded-[12px] py-3 px-4">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-[18px]">All Records</h3>
                        <FormDialog
                            type="add"
                            textBtn="Add New Entry"
                            dialogTitle="Add New Movie/TV Show"
                        />
                    </div>
                    <FavoritesTable />
                </section>
            </main>
        </>
    )
}

export default Home