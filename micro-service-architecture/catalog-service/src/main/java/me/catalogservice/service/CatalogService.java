package me.catalogservice.service;

import me.catalogservice.entity.CatalogEntity;

public interface CatalogService {
    Iterable<CatalogEntity> getAllCatalogs();
    CatalogEntity getCatalog(String productId);
    Iterable<CatalogEntity> getCatalogsByCategory(String category);
    CatalogEntity createCatalog(CatalogEntity catalog);
    CatalogEntity updateCatalog(String productId, CatalogEntity catalog);
    void deleteCatalog(String productId);
}
