package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.SupplierRequestDTO;
import com.grupodaca.dacasystem.dto.response.SupplierResponseDTO;

import java.util.List;

public interface ISupplierService {

    Long addSupplier(SupplierRequestDTO supplierRequestDTO);

    List<SupplierResponseDTO> supplierList();

    void deleteSupplier(long id);

    long updateSupplier(long id, SupplierRequestDTO supplierRequestDTO);
}
