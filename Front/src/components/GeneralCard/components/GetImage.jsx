const GetImage = (img) => {
    return (
        <div className="ratio ratio-4x3">
            <img className="card-img-top p-2 img-fluid" src={img} alt="Descripción de la imagen" />
        </div>
    );
};

export default GetImage